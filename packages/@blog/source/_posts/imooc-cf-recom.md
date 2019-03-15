---
title: 【慕课】个性化推荐算法
author: Mitscherlich
cover: https://img-mitscherlich-me.oss-cn-hangzhou.aliyuncs.com/18-11-16/Recommended-algorithm.jpg
date: 2018-11-16 13:31:35
category: Note
tags:
  - Python
  - 算法
---

> 这篇文章是我在[慕课网][imooc-url]学习 [@david_beck][class-url] 老师的[《个性化推荐算法实战入门必修课》][class-url]时根据老师所讲内容整理的笔记，使用 *jupyter Notebook + python 3* 整理形成，希望对你有所帮助。

现如今个性化推荐算法已经成为互联网产品不可缺少的一部分，本期课程的主要内容就是介绍一种最基础的 **Collaborative filtering (协同过滤)**。

### Itemcf 基于物品相似性的协同过滤

给用户推荐之前喜欢的物品相似物品；
- 如何衡量相似？
- 如何衡量喜欢？

#### 基本公式

##### Item 相似性

$s_{ij} = \frac{\lvert u(i) \bigcap u(j) \rvert}{\sqrt{\lvert u(i) \rvert \bigcup \lvert u(j) \rvert}}$

分子部分表示物品 $item$ 的重合程度，其中 $u(i)$ 表示对 $item_i$ 有过行为的用户集合，$u(j)$ 表示对 $item_j$ 有过行为的用户集合；分母部分是对重合程度的归一化。

##### User 行为评分

$p_{uj} = \sum_{i\in{N(u) \bigcap s(j,k)}}s_{ij} \times r_{ui}$

其中 $r_{ui}$ 表示 $user_u$ 对物品 $item_i$ 的行为得分，$s_{ij}$ 表示物品的相似度得分。

#### 公式升级

##### Item 相似性

- 在实际的工程项目中，应当指出的是并不是所有的用户都应当具有相同的权值；例如批发商和普通用户的权重就不应该相等，如果用批发商的行为衡量用户喜好，那显然是不合适的；故应对以上公式进行如下改进：

$s_{ij} = \frac{\sum_{u\in{u(i) \bigcap u(j)}}{\frac{1}{log(1 + \lvert N(u) \rvert)}}}{\sqrt{\lvert u(i) \rvert \lvert u(j) \rvert}}$

- 用户在不同时间对 $item$ 的操作应给予时间衰减惩罚：

$s_{ij} = \frac{\sum_{u\in{u(i) \bigcap u(j)}}{f(\Delta{t})}}{\sqrt{\lvert u(i) \rvert \lvert u(j) \rvert}}$

$f(\Delta{t}) = \frac{1}{1 + \alpha \Delta t}$

$f(\Delta{t})$ 表示时间差异指标，其中 $\alpha$ 为一常数，当 $\Delta{t}$ 越小，$f(\Delta{t})$ 取值与其接近于 $1$。

<!-- more -->

### Usercf 基于用户的协同过滤

给用户推荐相似兴趣用户感兴趣的物品：
- 如何评价相似兴趣集合？
- 如何找到集合用户感兴趣而目标用户没行为过的 $item$ ？

#### 基本公式

##### User 行为相似度

$s_{uv} = \frac{\lvert N(u) \bigcap N(v)}{\sqrt{\lvert N(u) \rvert \lvert N(v) \rvert}}$

##### User 行为评分

$p_{ui} = \sum_{v\in{s(u,k) \bigcap u(i)}}{s_{uv}r_{vi}}$

#### 公式升级

##### User 行为相似度

- 降低异常活跃物品对用户相似度的贡献：

$s_{uv} = \frac{\sum_{i\in{N(u) \bigcap N(v)}}{\frac{1}{log(1 + \lvert u(i) \rvert)}}}{\sqrt{\lvert N(u) \rvert \lvert N(v) \rvert}}$

- 不同用户对同一 $item$ 行为的时间段不同应该给予时间衰减惩罚：

$s_{uv} = \frac{\sum_{i\in{N(u) \bigcap N(v)}}{f(\Delta{t_i})}}{\sqrt{\lvert N(u) \rvert \lvert N(v) \rvert}}$

$f(\Delta{t_i}) = \frac{1}{1 + \alpha \lvert t_{ui} - t{vi} \rvert}$

$f(\Delta{t_i})$ 表示时间衰减惩罚率，其中 $t_{ui}$ 表示用户 $user_u$ 对物品 $item_i$ 行为的时间，$t_{vi}$ 表示用户 $user_v$ 对物品 $item_i$ 行为的时间，两个用户对同一物品操作时间的差越短，对同一物品行为的相似度也就越大，反之则越低。

### Usercf vs Itemcf

#### 优缺点比较

- 推荐实时性

Usercf 基于用户行为相似度矩阵进行推荐，用户的新行为不一定能很快的影响推荐结果，具有一定的滞后性；
Itemcf 则基于物品相似度矩阵，一旦用户对新的物品有了行为 (点击，加购，购买等)，推荐结果会立即发生改变。

- 新用户 / 新物品的推荐

Usercf 在对待新用户时，最初并不能给出较为准确的推荐结果，需要等用户有了一定的行为之后才能给出推荐结果；
Itemcf 在对待新物品时，由于新物品没有与其他物品建立相似性矩阵，所以无法立即将新物品推荐给其他用户。

- 推荐理由的可解释性

Usercf 基于用户行为进行推荐，可能出现一些特定用户用户并不感兴趣的推荐；
Itemcf 基于物品相似性进行推荐，完全给予用户过往行为，推荐结果较为了信服。

#### 适用场景

- 性能层面

Usercf 适用于用户较少的场景；Itemcf 适用于用户量远大于物品量的场景；
在实际生产项目中，通常用户数都远远大于物品数，Itemcf 在更多时候成为首选。

- 个性化层面

Usercf 适用于物品需要及时推荐下发而个性化不太强烈的领域；
Itemcf 适用于常规物品丰富且需要高度个性化的领域。

### 示例代码

首先引入需要的模块:

```python
from __future__ import division
import os
import sys
import math
import operator
```

读取 [MovieLens 数据集][movielens-url]:

- 读取用户点击信息:

```python
def get_user_click(rating_file):
    """
    get user click list
    Args:
        rating_file: input file
    Return:
        dict, key: userid, value: [itemid1, itemid2]
    """
    if not os.path.exists(rating_file):
        return {}, {}
    fp = open(rating_file)
    num = 0
    user_click = {}
    user_click_time = {}
    for line in fp:
        if num == 0:
            num += 1
            continue
        item = line.strip().split(',')
        if len(item) < 4:
            continue
        [userid, itemid, rating, timestamp] = item
        if userid + "_" + itemid not in user_click_time:
            user_click_time[userid + "_" + itemid] = int(timestamp)
        if float(rating) < 3.0:
            continue
        if userid not in user_click:
            user_click[userid] = []
        user_click[userid].append(itemid)
    fp.close()
    return user_click, user_click_time
```

- 读取电影条目信息:

```python
def get_item_info(item_file):
    """
    get item info[title, genres]
    Args:
        item_file: input item info file
    Return:
        a dict, key: itemid, value: [title, genres]
    """
    if not os.path.exists(item_file):
        return {}
    num = 0
    item_info = {}
    fp = open(item_file)
    for line in fp:
        if num == 0:
            num += 1
            continue
        item = line.strip().split(',')
        if len(item) < 3:
            continue
        if len(item) > 3:
            itemid = item[0]
            genres = item[-1]
            title = ",".join(item[1:-1])
        else:
            [itemid, title, genres] = item
        if itemid not in item_info:
            item_info[itemid] = [title, genres]
    fp.close()
    return item_info
```

公式算法:

- 基础贡献分:

```python
def base_contribute_score():
    """
    item cf / user cf base sim contribution by user
    """
    return 1
```

- 升级 1: 对不同用户权重给予惩罚:

```python
def enhance_one_contribute_score(user_total_click_num):
    """
    item cf enhance sim contribution score by user
    """
    return 1 / math.log10(1 + user_total_click_num)
```

- 升级 2: 对用户行为给予时间衰减惩罚

```python
def enhance_two_contribute_score(click_time_one, click_time_two):
    """
    itemcf update two sim contribution score by user
    """
    delta_time = abs(click_time_one - click_time_two)
    total_sec = 60 * 60 * 24
    delta_time = delta_time / total_sec
    return 1 / (1 + delta_time)
```

#### Itemcf

计算物品相似性:

```python
def cal_item_sim(user_click, user_click_time):
    """
    Args:
        user_click: dict, ket userid, value [itemid1, itemid2]
    Return:
        dict, key: itemid_i, value dict, value_key itemid_j, value_value simscore
    """
    co_appear = {}
    item_user_click_time = {}
    for user, itemlist in user_click.items():
        for index_i in range(0, len(itemlist)):
            itemid_i = itemlist[index_i]
            item_user_click_time.setdefault(itemid_i, 0)
            item_user_click_time[itemid_i] += 1
            for index_j in range(index_i, len(itemlist)):
                itemid_j = itemlist[index_j]
                if user + "_" + itemid_i not in user_click_time:
                    click_time_one = 0
                else:
                    click_time_one = user_click_time[user + "_" + itemid_i]
                if user + "_" + itemid_j not in user_click_time:
                    click_time_two = 0
                else:
                    click_time_two = user_click_time[user + "_" + itemid_j]
                co_appear.setdefault(itemid_j, {})
                co_appear[itemid_i].setdefault(itemid_j, 0)
                # co_appear[itemid_i][itemid_j] += base_contribute_score()
                # co_appear[itemid_i][itemid_j] += enhance_one_contribute_score(len(itemlist))
                co_appear[itemid_i][itemid_j] += enhance_two_contribute_score(click_time_one, click_time_two)

                co_appear.setdefault(itemid_j, {})
                co_appear[itemid_j].setdefault(itemid_i, 0)
                # co_appear[itemid_j][itemid_i] += base_contribute_score()
                # co_appear[itemid_j][itemid_i] += enhance_one_contribute_score(len(itemlist))
                co_appear[itemid_j][itemid_i] += enhance_two_contribute_score(click_time_one, click_time_two)
    item_sim_score = {}
    item_sim_score_sorted = {}
    for itemid_i, relate_item in co_appear.items():
        for itemid_j, co_time in relate_item.items():
            sim_score = co_time / math.sqrt(item_user_click_time[itemid_i] * item_user_click_time[itemid_j])
            item_sim_score.setdefault(itemid_i, {})
            item_sim_score[itemid_i].setdefault(itemid_j, 0)
            item_sim_score[itemid_i][itemid_j] = sim_score
    for itemid in item_sim_score:
        item_sim_score_sorted[itemid] = sorted(item_sim_score[itemid].items(), key = \
                                              operator.itemgetter(1), reverse=True)

    return item_sim_score_sorted
```

计算推荐结果:

```python
def itemcf_cal_recom_result(sim_info, user_click):
    """
    recom by itemcf
    Args:
        sim_info: item sim dict
        user_click: user click dict
    Return:
        dict, key: userid, value_key itemid, value_value recom score
    """
    recent_click_num = 3
    topk = 5
    recom_info = {}
    for user in user_click:
        click_list = user_click[user]
        recom_info.setdefault(user, {})
        for itemid in click_list[:recent_click_num]:
            if itemid not in sim_info:
                continue
            for item_sim_tuple in sim_info[itemid][:topk]:
                item_simid = item_sim_tuple[0]
                item_sim_score = item_sim_tuple[1]
                recom_info[user][item_simid] = item_sim_score
    return recom_info
```

辅助调试函数:

- 调试物品相似性:

```python
def debug_item_sim(item_info, sim_info):
    """
    show item sim info
    Args:
        item_info: dict, key itemid, value: [title, genres]
        sim_info: dict, key itemid, value dic, key [(itemid1, simscore), (itemid2, simscore)]
    """
    fixed_itemid = "1"
    if fixed_itemid not in item_info:
        print("invalid item id:", fixed_itemid)
        return
    [title_fix, genres_fix] = item_info[fixed_itemid]
    for item_tuple in sim_info[fixed_itemid][:5]:
        itemid_sim = item_tuple[0]
        sim_score = item_tuple[1]
        if itemid_sim not in item_info:
            continue
        [title, genres] = item_info[itemid_sim]
        print(title_fix + "\t" + genres_fix + "\tsim: " + title + "\t" + genres + "\t" + str(sim_score))
```

- 调试推荐结果:

```python
def debug_itemcf_recom_result(recom_result, item_info):
    """
    debug recom result
    Args:
        recom_result: key userid, value: dic, value_key: itemid, value_value: recom_score
        item_info: dict, key itemid, value: [title, genres]
    """
    user_id = "1"
    if user_id not in recom_result:
        print("invalid user id:", user_id)
        return
    for result_tuple in sorted(recom_result[user_id].items(), key=operator.itemgetter(1), reverse=True):
        item_id, score = result_tuple
        if item_id not in item_info:
            continue
        print(",".join(item_info[item_id]) + "\t" + str(score))
```

Itemcf 主流程:

```python
def itemcf_main_flow():
    """
    main flow of itemcf
    """
    user_click, user_click_time = get_user_click('./data/ratings.csv')
    item_info = get_item_info('./data/movies.csv')
    sim_info = cal_item_sim(user_click, user_click_time)
    # debug_item_sim(item_info, sim_info)
    recom_result = itemcf_cal_recom_result(sim_info, user_click)
    # debug_itemcf_recom_result(recom_result, item_info)
    print(recom_result["1"])

if __name__ == "__main__":
    itemcf_main_flow()
```

#### Usercf

将 `user_click` 转化为 `item_click_by_user`:

```python
def transfer_user_click(user_click):
    """
    get item by user click
    Args:
        user_click: a dict, key userid, value: [itemid1, itemid2]
    Return:
        dict, key: itemid, value: [userid1, userid2]
    """
    item_click_by_user = {}
    for user in user_click:
        item_list = user_click[user]
        for itemid in item_list:
            item_click_by_user.setdefault(itemid, [])
            item_click_by_user[itemid].append(user)
    return item_click_by_user
```

计算用户相似度:

```python
def cal_user_sim(item_click_by_user, user_click_time):
    """
    get user sim info
    Args:
        item_click_by_user: dict, key: itemid, value: [itemid1, itemid2]
    Return:
        dict, key: itemid, value: dict, value_key: itemid_j, value_value: simscore
    """
    co_appear = {}
    user_click_count = {}
    for itemid, user_list in item_click_by_user.items():
        for index_i in range(0, len(user_list)):
            user_i = user_list[index_i]
            user_click_count.setdefault(user_i, 0)
            user_click_count[user_i] += 1
            if user_i + "_" + itemid not in user_click_time:
                click_time_one = 0
            else:
                click_time_one = user_click_time[user_i + "_" + itemid]
            for index_j in range(index_i + 1, len(user_list)):
                user_j = user_list[index_j]
                if user_j + "_" + itemid not in user_click_time:
                    click_time_two = 0
                else:
                    click_time_two = user_click_time[user_j + "_" + itemid]
                co_appear.setdefault(user_i, {})
                co_appear[user_i].setdefault(user_j, 0)
                # co_appear[user_i][user_j] += base_contribute_score()
                # co_appear[user_i][user_j] += enhance_one_contribute_score(len(user_list))
                co_appear[user_i][user_j] += enhance_two_contribute_score(click_time_one, click_time_two)
                co_appear.setdefault(user_j, {})
                co_appear[user_j].setdefault(user_i, 0)
                # co_appear[user_j][user_i] += base_contribute_score()
                # co_appear[user_j][user_i] += enhance_one_contribute_score(len(user_list))
                co_appear[user_j][user_i] += enhance_two_contribute_score(click_time_one, click_time_two)

    user_sim_info = {}
    user_sim_info_sorted = {}
    for user_i, relate_user in co_appear.items():
        user_sim_info.setdefault(user_i, {})
        for user_j, cotime in relate_user.items():
            user_sim_info[user_i].setdefault(user_j, 0)
            user_sim_info[user_i][user_j] = cotime / math.sqrt(user_click_count[user_i] * user_click_count[user_j])
    for user in user_sim_info:
        user_sim_info_sorted[user] = sorted(user_sim_info[user].items(), key = \
                                     operator.itemgetter(1), reverse=True)
    return user_sim_info_sorted
```

计算推荐结果:

```python
def usercf_cal_recom_result(user_click, user_sim):
    """
    recom by usercf algo
    Args:
        user_click: dict, key userid, value [itemid1, itemid2]
        user_sim: key: userid, value:[(userid_j, score1), (userid_k, score2)]
    Return:
        dict, key userid, value: dict, value_key: itemid, value_value: recom_score
    """
    recom_result = {}
    topk_user = 3
    item_num = 5
    for user, item_list in user_click.items():
        tmp_dict = {}
        for itemid in item_list:
            tmp_dict.setdefault(itemid, 1)
        recom_result.setdefault(user, {})
        for user_tuple in user_sim[user][:topk_user]:
            userid_j, sim_score = user_tuple
            if userid_j not in user_click:
                continue
            for itemid_j in user_click[userid_j][:item_num]:
                recom_result[user].setdefault(itemid_j, sim_score)
    return recom_result
```

辅助调试函数:

- 调试用户相似度:

```python
def debug_user_sim(user_sim):
    """
    print user sim result
    Args:
        user_sim: key userid, value: [(userid1, score1), (userid2, score2)]
    """
    topk = 5
    fixed_user = "1"
    if fixed_user not in user_sim:
        print("invalid user id:", fixed_user)
        return
    for sim_tuple in user_sim[fixed_user][:topk]:
        userid, score = sim_tuple
        print(fixed_user + "\tsim_user: " + userid + "\t" + str(score))
```

- 调试推荐结果:

```python
def debug_usercf_recom_result(item_info, recom_result):
    """
    print recom result for usercf
    Args:
        item_info: key: itemid, value: [title, genres]
        recom_result: ket userid, value: dict, value_key: itemid, value_value: recom_score
    """
    fixed_user = "1"
    if fixed_user not in recom_result:
        print("invalid user id:", fixed_user)
        return
    for itemid in recom_result[fixed_user]:
        if itemid not in item_info:
            continue
        recom_score = recom_result[fixed_user][itemid]
        print("recom result: " + ",".join(item_info[itemid]) + "\t" + str(recom_score))
```

Usercf 主流程:

```python
def usercf_main_flow():
    """
    main flow of usercf
    """
    user_click, user_click_time = get_user_click('./data/ratings.csv')
    item_info = get_item_info('./data/movies.csv')
    item_click_by_user = transfer_user_click(user_click)
    user_sim = cal_user_sim(item_click_by_user, user_click_time)
    # debug_user_sim(user_sim)
    recom_result = usercf_cal_recom_result(user_click, user_sim)
    # debug_usercf_recom_result(item_info, recom_result)
    print(recom_result["1"])

if __name__ == "__main__":
    usercf_main_flow()
```

[imooc-url]: https://www.imooc.com/
[tech-url]: https://www.imooc.com/u/3303124/courses
[class-url]: https://www.imooc.com/learn/1029
[movielens-url]: https://grouplens.org/datasets/movielens/
